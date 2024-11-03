
import sys
import numpy as np
import matplotlib.pyplot as plt
from scipy.io import wavfile as wav
from scipy.fft import fft, fftfreq
import matplotlib.animation as animation
import numpy as np
import argparse

def pack_version(major, minor, patch):
  return ((major & 0xFF) << 16) | ((minor & 0xFF) << 8) | (patch & 0xFF)

# Arguments
parser = argparse.ArgumentParser()
parser.add_argument("-i", "--inputfile", help="Input filename")
parser.add_argument("-o", "--outputfile", help="Output filename")
parser.add_argument("-sr", "--samplerate", help="Sample rate", type=int, default=10)
parser.add_argument("-ss", "--samplesize", help="Sample size", type=int, default=100)
parser.add_argument("-m", "--maxfreq", help="Max frequency", type=int, default=4000)

# 1 - input, 2 - output files
args = parser.parse_args()
vmajor, vminor, vpatch = 1, 0, 0
infilename = args.inputfile
outfilename = args.outputfile
sampleRate = args.samplerate
outSampleSize = args.samplesize
outMaxFreq = args.maxfreq

print(f'Version: {vmajor}.{vminor}.{vpatch}')
print("Input file:", infilename)
print("Output file", outfilename)
print("Sample rate", sampleRate)
print("Sample size", outSampleSize)
print("Max frequency", outMaxFreq)

if len(sys.argv) < 2:
  exit()

# read file
rate, data = wav.read(infilename)
data = [int(i[0]) for i in data] # Remove multiple channels


# calculate xf
sampleSize = rate // sampleRate # sampelrate frames per second
xf = fftfreq(sampleSize, 1 / rate)[:sampleSize // 2] # remove part lower 0
freqD = xf[1]
maxFreqI = int(min(outMaxFreq // freqD + 1, len(xf)))
xf = xf[:maxFreqI]
maxFreq = xf[-1]

from scipy.signal.windows import blackman
w = blackman(sampleSize) # window filter

def norm(x):
  return np.abs(x) / sampleSize


samplesCount = len(data) // sampleSize
outA = np.array([pack_version(vmajor, vminor, vpatch), sampleRate, outSampleSize, samplesCount, maxFreq])

sampleConvCounts = np.zeros(outSampleSize, dtype=int)
coef = outSampleSize / maxFreqI
for i in range(maxFreqI):
   sampleConvCounts[int(i * coef)] += 1

for i in range(len(data) // sampleSize):
    subdata = data[i * sampleSize:(i + 1) * sampleSize]
    freqs = norm(fft(subdata * w)[:maxFreqI])

    # Sampling
    outFreqs = np.zeros(outSampleSize, dtype=int)
    for j in range(maxFreqI):
      outFreqs[int(j * coef)] += freqs[j]
    for j in range(outSampleSize):
      outFreqs[j] /= sampleConvCounts[j]
    
    outA = np.concat((outA, outFreqs))

# convert in cycle

# write to output file
outA.astype('uint32').tofile(outfilename)