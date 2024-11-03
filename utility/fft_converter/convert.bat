ffmpeg -i %1.mp3 %1.wav
py ../../../utility/fft_converter/convert.py -i %1.wav -o %1.fdp
del %1.wav