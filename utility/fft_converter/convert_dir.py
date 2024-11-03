import os
import argparse
from os import walk


def unpack_version(data):
  return (data >> 16) & 0xFF, (data >> 8) & 0xFF, data & 0xFF

# Arguments
parser = argparse.ArgumentParser()
parser.add_argument("-i", "--inputpath", help="Input dir path")
parser.add_argument("-o", "--outputpath", help="Output dir path")

args = parser.parse_args()
inpath = args.inputpath
outpath = args.outputpath

if not inpath:
  print("ERROR: no input dir specified")
  exit()
if not outpath:
  print("ERROR: no output dir specified")
  exit()



filenames = next(walk(args.inputpath), (None, None, []))[2]

for file in filenames:
  file = str(file)

  print(file)
  if file.endswith(".mp3"):
    # convert
    file = file.removesuffix(".mp3")
    print("Convert", file)
    os.system(f'ffmpeg -i "{inpath + file}.mp3" "{outpath + file}.wav"')
    os.system(f'py utility/fft_converter/convert.py -i "{outpath + file}.wav" -o "{outpath + file}.fdp"')
    os.remove(f'{outpath + file}.wav')
    print("-")