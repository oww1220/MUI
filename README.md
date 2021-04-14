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

### ■ 다운받은 경로에 `gulp` 명령어로 구동시킴

### ■ gulp 패키지들
- `npm i -D gulp`
   - gulp: gulp core 빌드 자동화 툴

- `npm i -D gulp-sass node-sass gulp-sourcemaps gulp-autoprefixer gulp-pxtorem gulp-modify-css-urls`
	- gulp-sass: sass를 CSS 로 변경
	- node-sass: sass 컴파일러
	- gulp-sourcemaps: sass map파일 생성
   	- gulp-autoprefixer: 자동으로 CSS prefixer 생성
   	- gulp-pxtorem: 자동으로 CSS rem 생성
	- gulp-modify-css-urls: css 내부 백그라운드 url변경

- `npm i -D browser-sync`
   	- browser-sync: CSS, HTML, JS, TS 수정시 브라우저 자동 리플레쉬

- `npm i -D gulp-uglify gulp-concat`
   	- gulp-uglify: 파일 압축
	- gulp-concat: 파일 병합

- `npm i -D gulp-plumber`
   	- gulp-plumber: errorhandling!

- `npm i -D gulp-typescript typescript`
   	- gulp-typescript: TypeScript 컴파일 워크 플로를 처리하기위한 gulp 플러그인. 플러그인은 TypeScript API를 사용하여 TypeScript의 컴파일러 옵션을 gulp에 노출합니다.
	- typescript: typescript core 컴파일러




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