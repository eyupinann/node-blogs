const { MongoClient } = require('mongodb');

const mongoose = require('mongoose');


// MongoDB bağlantı adresi
const dbURI = '127.0.0.1';

// Mongoose bağlantısını başlatın
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

// Bağlantı başarılı olduğunda bir olay dinleyin
mongoose.connection.on('connected', () => {
    console.log('Mongoose bağlandı ' + dbURI);
});

// Bağlantı hatası olduğunda bir olay dinleyin
mongoose.connection.on('error', (err) => {
    console.log('Mongoose hatası: ' + err);
});

// Bağlantı kesildiğinde bir olay dinleyin
mongoose.connection.on('disconnected', () => {
    console.log('Mongoose bağlantısı kesildi');
});

// Uygulama kapatıldığında bağlantıyı kapatın
process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log('Uygulama sonlandırıldı. Mongoose bağlantısı kapatıldı');
        process.exit(0);
    });
});


