import os
import argparse
import eyed3
from os import walk

import eyed3.id3


def unpack_version(data):
  return (data >> 16) & 0xFF, (data >> 8) & 0xFF, data & 0xFF

# Arguments
parser = argparse.ArgumentParser()
parser.add_argument("-i", "--inputpath", help="Input dir path")
parser.add_argument("-o", "--outputpath", help="Output dir path")
parser.add_argument("-j", "--jsonfile", help="Output json with metadata")
parser.add_argument("-ji", "--jsoninputpath", help="Input dir path for json to write")
parser.add_argument("-jo", "--jsonoutputpath", help="Output dir path for json to write")

args = parser.parse_args()
inpath = args.inputpath
outpath = args.outputpath
jsonFilename = args.jsonfile
jsoninpath = args.jsoninputpath
jsonoutpath = args.jsonoutputpath


if not inpath:
  print("ERROR: no input dir specified")
  exit()
if not outpath:
  print("ERROR: no output dir specified")
  exit()
if not jsonFilename:
  print("ERROR: no json output file specified")
  exit()
if not jsoninpath:
  print("ERROR: no json input path specified")
  exit()
if not jsonoutpath:
  print("ERROR: no json output path specified")
  exit()



filenames = next(walk(args.inputpath), (None, None, []))[2]

tag = eyed3.id3.Tag()
metadataStr = ""

for file in filenames:
  file = str(file)

  print(file)
  if not file.endswith(".mp3"):
    continue

  # convert
  file = file.removesuffix(".mp3")
  print("Convert", file)
  os.system(f'ffmpeg -i "{inpath + file}.mp3" "{outpath + file}.wav"')
  os.system(f'py utility/fft_converter/convert.py -i "{outpath + file}.wav" -o "{outpath + file}.fdp"')
  os.remove(f'{outpath + file}.wav')
  print("-")

  # Collect metadata
  tag.parse(inpath + file + ".mp3")

  if metadataStr:
    metadataStr += ",\n"
  metadataStr += '  {\n' + '    "author": "' + tag.artist + '",\n' + '    "name": "' + tag.title + '",\n' + '    "filename": "' + jsoninpath + file + '.mp3",\n' + '    "fftfilename": "' + jsonoutpath + file + '.fdp"\n  }'


with open(jsonFilename, "w") as file:
  file.write(f"[\n{metadataStr}\n]")