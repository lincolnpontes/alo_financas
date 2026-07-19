$ErrorActionPreference = 'Stop'

$root = Resolve-Path (Join-Path $PSScriptRoot '..')
$javaHome = 'C:\Program Files\Android\Android Studio\jbr'
$androidHome = Join-Path $env:LOCALAPPDATA 'Android\Sdk'

if (!(Test-Path (Join-Path $javaHome 'bin\java.exe'))) {
  throw 'O Java do Android Studio nao foi encontrado.'
}
if (!(Test-Path $androidHome)) {
  throw 'O Android SDK nao foi encontrado.'
}

$env:JAVA_HOME = $javaHome
$env:ANDROID_HOME = $androidHome
$env:ANDROID_SDK_ROOT = $androidHome

& (Join-Path $root 'android\gradlew.bat') -p (Join-Path $root 'android') assembleRelease
if ($LASTEXITCODE -ne 0) {
  throw 'A compilacao do APK falhou.'
}

$outputDirectory = Join-Path $root 'outputs\android'
$source = Join-Path $root 'android\app\build\outputs\apk\release\app-release.apk'
$version = (Get-Content -LiteralPath (Join-Path $root 'package.json') -Raw | ConvertFrom-Json).version
$target = Join-Path $outputDirectory "Alo-Financas-v$version.apk"
New-Item -ItemType Directory -Path $outputDirectory -Force | Out-Null
Copy-Item -LiteralPath $source -Destination $target -Force
Write-Output "APK criado em $target"
