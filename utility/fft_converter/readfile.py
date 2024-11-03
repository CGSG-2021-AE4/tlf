import sys
import numpy as np

import matplotlib.pyplot as plt
import matplotlib.animation as animation
import argparse


def unpack_version(data):
  return (data >> 16) & 0xFF, (data >> 8) & 0xFF, data & 0xFF

# Arguments
parser = argparse.ArgumentParser()
parser.add_argument("-i", "--inputfile", help="Input filename")

args = parser.parse_args()
infilename = args.inputfile

data = np.fromfile(infilename, 'uint32')
print(len(data))
(vdata, sampleRate, sampleSize, samplesCount, maxFreq) = data[:5]

print(unpack_version(vdata), sampleRate, sampleSize, samplesCount, maxFreq)
xf = np.linspace(0, maxFreq, sampleSize)

# print("|", sampleSize, "|", rate, "|", len(xf), "|", xf[0], "|", xf[-1], "|")
# #print(xf)

fig, ax = plt.subplots()
line, = ax.plot(xf, np.sin(xf) * 1000)

def animate(i):
    if (i + 1) * sampleSize > len(data):
       return line,
    subdata = data[i * sampleSize:(i + 1) * sampleSize]
    line.set_ydata(subdata)  # update the data.
    return line,


ani = animation.FuncAnimation(
    fig, animate, interval=1000 / sampleRate, blit=True, save_count=20)

plt.show()
