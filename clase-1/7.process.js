// Argumentos de entrada
// console.log(process.argv);

// Controlar el proceso de salida
// process.exit(1);

// Podemos controlar eventos del proceso
// process.on('exit', () => {
// Limpiar os recursos
// });

// Current working directory
console.log(process.cwd());
// Plataforma del sistema operativo
console.log(process.platform);
console.log(process.cpuUsage());

// Variables de entorno
console.log(process.env.PEPITO); // Ejecutar en consola Ej: PEPITO=Gabriel node 7.process.js
