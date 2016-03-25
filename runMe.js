var shelljs = require('shelljs');

// Hack taken from http://krasimirtsonev.com/blog/article/Fun-playing-with-npm-dependencies-and-postinstall-script
var deps = ['OcamlCppo'], index = 0;
(function doWeHaveAllDeps() {
  if(index === deps.length) {
    shelljs.mkdir('src');
    var cppo = require('OcamlCppo');
    cppo('-n', 'yojson.mli.cppo', '-o', 'src/yojson.mli', function() {
      shelljs.exec('ocamllex read.mll -o read.ml');
      cppo('-D', '\"VERSION 1.3.2\"', 'yojson.ml.cppo', '-o', 'src/yojson.ml');
    });
    return;
  } else if(isModuleExists(deps[index])) {
    index += 1;
    doWeHaveAllDeps();
  } else {
    setTimeout(doWeHaveAllDeps, 500);
  }
})();

function isModuleExists( name ) {
  try { return !!require.resolve(name); }
  catch(e) { return false }
}
