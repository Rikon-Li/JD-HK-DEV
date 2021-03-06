// 加载模块
const {task,src,dest,watch,series,parallel} = require('gulp');
// 用于加载其他gulp插件
const load = require('gulp-load-plugins')();
// nodejs的del模块用于删除文件
const del = require('del');

// 删除dist目录
task('delDist',async ()=>{
  await del('./dist');
})

// 处理图片
task('image', async ()=>{
  src('./images/*.*')
  .pipe(dest('./dist/images'))
  .pipe(load.connect.reload())
})

// 处理数据
task('data', async ()=>{
  src('./data/*.*')
  .pipe(dest('./dist/data'))
  .pipe(load.connect.reload())
})

// 处理sass
task('sass', async ()=>{
  src('./sass/*.scss')
  .pipe(load.sassChina())
  .pipe(dest('./dist/styles'))
  .pipe(load.connect.reload())
})

task('css', async ()=>{
  src('./styles/*.css')
  .pipe(dest('./dist/styles'))
  .pipe(load.connect.reload())
})

// 处理js
task('script', async ()=>{
  src('./script/*.js')
  .pipe(dest('./dist/script'))
  .pipe(load.connect.reload())
})

// 处理html
task('html', async ()=>{
  src('./pages/*.html')
  .pipe(dest('./dist/pages'))
  .pipe(load.connect.reload())
})

// 监听文件变化
task('watch',async ()=>{
  watch('./images/*.*',series('image'));
  watch('./data/*.*',series('data'));
  watch('./sass/*.scss',series('sass'));
  watch('./styles/*.css',series('css'));
  watch('./script/*.js',series('script'));
  watch('./pages/*.html',series('html'));
})

// 启动服务，自动刷新
task('connect',async ()=>{
  load.connect.server({
    root: './dist',
    livereload: true,
    port: 3000
  });
})

// 构建开发包
task('dev',series('delDist','image','data','css','sass','script','html','connect','watch'))
