"use strict"
const fs = require('fs-extra');

var build = {
	files:[
	'../index.html',
	'../service_worker.js',
	'../manifest.json',
	'../css/style.css',
	'../css/materialize.css',
	'../js/materialize.js',
	'../js/typeit.js',
	'../js/app.js',
	'../img/512x512.png',
	'../img/android-icon-144x144.png',
	'../img/android-icon-192x192.png',
	'../img/android-icon-36x36.png',
	'../img/android-icon-48x48.png',
	'../img/android-icon-72x72.png',
	'../img/android-icon-96x96.png',
	'../img/apple-icon-114x114.png',
	'../img/apple-icon-120x120.png',
	'../img/apple-icon-144x144.png',
	'../img/apple-icon-152x152.png',
	'../img/apple-icon-180x180.png',
	'../img/apple-icon-57x57.png',
	'../img/apple-icon-60x60.png',
	'../img/apple-icon-72x72.png',
	'../img/apple-icon-76x76.png',
	'../img/apple-icon-precomposed.png',
	'../img/apple-icon.png',
	'../img/bg1.png',
	'../img/demo.gif',
	'../img/favicon-16x16.png',
	'../img/favicon-32x32.png',
	'../img/favicon-96x96.png',
	'../favicon.ico',
	'../img/kanban.png',
	'../img/ms-icon-144x144.png',
	'../img/ms-icon-150x150.png',
	'../img/ms-icon-310x310.png',
	'../img/ms-icon-70x70.png',
	'../img/laptop_bg.jpg',
	'../img/1.gif',
	'../img/2.gif',
	'../img/3.gif',
	],

}

const initCopy = ()=>{
	return new Promise((resolve,reject)=>{
		build.files.map((file)=>{
			fs.copy(file, `../build/temp/${file}`)
			.then(() => console.log(`added : ${file}`))
			.catch(err => console.error(err));
		});
		resolve();
	})
};

//copy files in app files into the build folder
initCopy()
.then(()=>{
	console.log(`
		Files built successfully on the ${new Date()}

		Check the "build/" folder
		`)
})
/*
TO DO :

Add ability to zip folder
*/