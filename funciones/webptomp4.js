function toVideo(buffer, ext) {
    return ffmpeg(buffer, [
      '-c:v', 'libx264',
      '-c:a', 'aac',
      '-ab', '128k',
      '-ar', '44100',
      '-crf', '32',
      '-preset', 'slow'
    ], ext, 'mp4')
  }
  
  module.exports = {toVideo}