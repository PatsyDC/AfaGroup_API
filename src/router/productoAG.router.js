const { S3Client } = require("@aws-sdk/client-s3");
const router = require('express').Router()
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');
const ProductoAG = require('../model/productoAG.model')

const s3 = new S3Client({
    region: 'us-east-2',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  endpoint: 'https://s3.us-east-2.amazonaws.com', // también puedes omitir esta línea si `region` está correcto
});

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_BUCKET_NAME,
        // acl: 'public-read',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function (req, file, cb) {
        const filename = `productos/${Date.now()}${path.extname(file.originalname)}`;
        cb(null, filename);
        }
    })
});

// Configuración de almacenamiento
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/'); // Carpeta donde se guardarán las imágenes
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + path.extname(file.originalname)); // Nombre único para la imagen
//     }
// });

// const upload = multer({ storage });

router.get("/productoAG/", async(req, res) => {
    const producto = await ProductoAG.findAll()
    res.status(200).json({
        ok: true,
        status: 200,
        body: producto
    })
});

router.get("/productoAG/:producto_id/", async(req, res) => {
    const id = req.params.producto_id;
    const producto = await ProductoAG.findOne({
        where: {
            producto_id: id
        }
    });
    res.status(200).json({
        ok: true,
        status: 200,
        body: producto
    })
});

router.post("/productoAG/", upload.fields([
  { name: 'imagen_url', maxCount: 1 },
  { name: 'ficha_tecnica', maxCount: 1 }
]), async (req, res) => {
  try {
    await ProductoAG.sync();

    const {
      categoria_id,
      nombre_producto,
      descripcion_producto,
      codigo_sunat,
      tipo_producto,
      tipo_existencia,
      compra,
      kardex,
      nombre_comercial,
      stock_actual,
      stock_minimo,
      stock_maximo,
      peso,
      precio
    } = req.body;

    const imagen_url = req.files['imagen_url'] ? req.files['imagen_url'][0].location : null;
    const ficha_tecnica = req.files['ficha_tecnica'] ? req.files['ficha_tecnica'][0].location : null;

    const createProducto = await ProductoAG.create({
      categoria_id,
      nombre_producto,
      descripcion_producto,
      codigo_sunat,
      tipo_producto,
      tipo_existencia,
      compra,
      kardex,
      nombre_comercial,
      stock_actual,
      stock_minimo,
      stock_maximo,
      peso,
      precio,
      imagen_url,
      ficha_tecnica
    });

    res.status(201).json({
      ok: true,
      status: 201,
      message: "Producto creado",
      body: createProducto
    });

  } catch (error) {
    res.status(500).json({
      ok: false,
      message: "error al crear producto",
      error: error.message
    });
  }
});

router.put("/productoAG/:producto_id/", upload.fields([
  { name: 'imagen_url', maxCount: 1 },
  { name: 'ficha_tecnica', maxCount: 1 }
]), async (req, res) => {
  try {
    const id = req.params.producto_id;
    const dataProducto = req.body;

    // Verificar si el producto existe
    const producto = await ProductoAG.findByPk(id);
    if (!producto) {
      return res.status(404).json({
        ok: false,
        status: 404,
        message: "Producto no encontrado"
      });
    }

    // Obtener archivos si se subieron
    const imagen_url = req.files['imagen_url'] ? req.files['imagen_url'][0].location : producto.imagen_url;
    const ficha_tecnica = req.files['ficha_tecnica'] ? req.files['ficha_tecnica'][0].location : producto.ficha_tecnica;

    // Actualizar el producto
    await ProductoAG.update({
      categoria_id: dataProducto.categoria_id,
      nombre_producto: dataProducto.nombre_producto,
      descripcion_producto: dataProducto.descripcion_producto,
      codigo_sunat: dataProducto.codigo_sunat,
      tipo_producto: dataProducto.tipo_producto,
      tipo_existencia: dataProducto.tipo_existencia,
      compra: dataProducto.compra,
      kardex: dataProducto.kardex,
      nombre_comercial: dataProducto.nombre_comercial,
      stock_minimo: dataProducto.stock_minimo,
      stock_maximo: dataProducto.stock_maximo,
      peso: dataProducto.peso,
      imagen_url: imagen_url,
      ficha_tecnica: ficha_tecnica,
      precio: dataProducto.precio
    }, {
      where: { producto_id: id }
    });

    const producto_actualizado = await ProductoAG.findByPk(id);

    res.status(200).json({
      ok: true,
      status: 200,
      message: "Producto actualizado correctamente",
      body: producto_actualizado
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: "Error al actualizar producto",
      error: error.message
    });
  }
});

router.delete("/productoAG/:producto_id/", async (req, res) => {
    const id = req.params.producto_id;
    const deleteProducto = await ProductoAG.destroy({
        where: {
            producto_id: id
        }
    });
    res.status(200).json({
        ok: true,
        status: 200,
        body: deleteProducto
    })
});

module.exports = router;
const express = require('express');
