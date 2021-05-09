## gulp 설정

### ■ `전역에 gulp cli설치`
`npm i gulp-cli -g`

### ■ `gulp -v 응답이 없을시`
`Windows 로고 키 + X 키로 'Windows PowerShell(관리자)' 를 연다`<br />
스크립트 실행 권한이 제한된 상태일수 있으니<br />
파워쉘을 관리자 권한으로 실행해서 권한을 변경하면 해결할 수 있다. <br />
그 전에 아래 명령어를 실행하면 명령어에 해당하는 정보를 볼 수 있는데, 여기에서 어떤 권한을 설정할 수 있는지 확인할 수 있다.

### ■ `C:\> get-help Set-ExecutionPolicy`
Restricted(제한된): 실행 권한 정책 기본 옵션, 명령어 하나씩 실행 가능. .ps1 스크립트 파일을 로드해 실행 불가능<br />
AllSigned: 신뢰된 배포자에 의해 서명된 스크립트만 실행 가능<br />
RemoteSigned: 로컬 컴퓨터에서 본인이 생성한 스크립트만 실행 가능 또는 인터넷에서 다운로드 받은 경우 신뢰된 배포자에 의해 서명된 것만 실행 가능<br />
Unrestricted: 제한 없이 모든 스크립트 실행 가능<br />
ByPass: 어떤 것도 차단하지 않고 경고 없이 실행 가능<br />
Undefined: 정책 적용 안함.<br />
이 중 원하는 권한을 골라서 적용하면 된다. 나는 그나마 안전할 것 같은 수준의 RemoteSigned로 설정했고, 명령어를 실행할 수 있었다. <br />
권한 변경은 관리자 권한으로 실행한 뒤 해줘야 가능하다!

### ■ `C:\> Set-ExecutionPolicy RemoteSigned`

### ■ gulp 프로젝트 다운후 다운받은 경로에 `npm i` 패키지 설치

### ■ package.json 에 scripts작성! 환경분리!

### ■ 다운받은 경로에 `npm run pc` `npm run mo` ||  `yarn pc` `yarn mo` 명령어로 구동시킴

### ■ gulp 패키지들
- `npm i -D gulp del`
   - gulp: gulp core 빌드 자동화 툴
   - del: 폴더 삭제 모듈!

- `npm i -D gulp-sass node-sass gulp-sourcemaps gulp-autoprefixer gulp-pxtorem gulp-modify-css-urls gulp-cssnano`
	- gulp-sass: sass를 CSS 로 변경
	- node-sass: sass 컴파일러
	- gulp-sourcemaps: sass map파일 생성
   	- gulp-autoprefixer: 자동으로 CSS prefixer 생성
   	- gulp-pxtorem: 자동으로 CSS rem 생성
	- gulp-modify-css-urls: css 내부 백그라운드 url변경
	- gulp-cssnano: css 작성 시 실수할 수 있는 요소들, 불필요하게 길게 작성하는 요소들을 정리

- `npm i -D browser-sync`
   	- browser-sync: CSS, HTML, JS, TS 수정시 브라우저 자동 리플레쉬

- `npm i -D gulp-uglify gulp-concat`
   	- gulp-uglify: 파일 압축
	- gulp-concat: 파일 병합

- `npm i -D gulp-plumber`
   	- gulp-plumber: errorhandling!

- `npm i -D webpack-stream fork-ts-checker-webpack-plugin`
   	- webpack-stream: Run webpack as a stream to conveniently integrate with gulp.
	- fork-ts-checker-webpack-plugin: webpack에서 typescript error발생시 빌드막는 플러그인
		- 별도의 프로세스에서 정적 유형 검사를 실행, 이는 빌드 속도를 극적으로 향상시키기 때문에 환상적임

- `npm i -D typescript @babel/preset-typescript @babel/plugin-proposal-class-properties @babel/plugin-proposal-object-rest-spread`
	- typescript: typescript core 컴파일러
	- @babel/preset-typescript : babel-loader가 ts 컴파일 하게 해줌!
	- @babel/plugin-proposal-class-properties : class 를 사용 가능처리!
	- @babel/plugin-proposal-object-rest-spread : spread연산자 사용 가능처리!

- `npm i -D babel-loader @babel/core @babel/preset-env`
	- babel-loader: webpack용 babel loader!
   	- @babel/core : babel 사용필수 라이브러리!
	- @babel/preset-env: babel es5 트랜스파일러!

- `npm i -D @babel/polyfill`
	- @babel/polyfill: 바벨을 사용하면 새로운 문법을 구형 자바스크립트 문법으로만 바꿔줍니다. ES2015의 새로운 객체(Promise, Map, Set 등등)과 메소드(Array.find, Object.assign 등등)을 사용가능하게 해줌!
		- es6 의 새로운 객체와 메소드 사용 가능 처리

### `■ 파이프라인 ■`
.ts --> `[webpack-stream]` --> bundle 및 es5


### `■ env-cmd`
package.json 내부에 scripts에서 env-cmd -f .env.dev이런식으로 env 파일을 강제로 실행시키게 해준다!<br/>
`npm i -D env-cmd`

### `■ 경로체크부분`
- `tsconfig.json` : 타입스크립트 설정->프로젝트 맞게 url설정 및 필요하다면 상속으로 각각 환경에 맞게 tsconfig 재정의함
- `gulp.js` : 걸프 파이프 라인 설정->프로젝트 맞게 url설정
- `.env` : 환경변수 설정 파일->프로젝트 맞게 내부 키워드 설정 ex) pc, mo 
- `.gitignore` : 프로젝트 내에서 깃 커밋 무시->프로젝트 맞게 url설정 


### `■ 메타변환함수 예시`
function meta_change(version){
	var v = version
	var _desc ="initial-scale=1.0, minimum-scale=1.0, user-scalable=yes, target-densitydpi=medium-dpi, width=device-width" //확대가능
	var _desc1 ="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, target-densitydpi=medium-dpi" //오리지널
	if(v==0){
		document.querySelector('meta[name="viewport"]').setAttribute("content", _desc);
	}else{
		document.querySelector('meta[name="viewport"]').setAttribute("content", _desc1);
	}
	
}