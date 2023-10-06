import asyncHandler from 'express-async-handler';
import TypeValues from '../models/typeValuesModel.js';

// @desc    Agregar un registro
// @route   POST /api/users/add-type-values
// @access  Private
const addTypeValues = asyncHandler(async (req, res) => {
  const { typevalue, subtype, description } = req.body;

  const userId = req.user._id;

  try {
    const newTypeValues = await TypeValues.create({
        typevalue,
      subtype,
      description,
      idUsuario: userId, // Asocia el registro con el usuario autenticado
    });

    if (newTypeValues) {
      res.status(201).json({ message: 'TypeValues agregado con éxito', data: newTypeValues });
    } else {
      res.status(400);
      throw new Error('No se pudo agregar TypeValues');
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al agregar TypeValues', error: error.message });
  }
});

// @desc    Actualizar un registro por ID
// @route   PUT /api/users/update-type-values/:id
// @access  Private
const updateTypeValues = asyncHandler(async (req, res) => {
  const { typevalue, subtype, description } = req.body;

  try {
    const typeValues = await TypeValues.findById(req.params.id);

    if (typeValues) {
      if (typeValues.idUsuario.toString() === req.user._id.toString()) {
        typeValues.typevalue = typevalue;
        typeValues.subtype = subtype;
        typeValues.description = description;

        const updatedTypeValues = await typeValues.save();
        res.json({ message: 'TypeValues actualizado con éxito', data: updatedTypeValues });
      } else {
        res.status(403);
        throw new Error('No tienes permiso para actualizar este TypeValues');
      }
    } else {
      res.status(404);
      throw new Error('TypeValues no encontrado');
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar TypeValues', error: error.message });
  }
});

// @desc    Eliminar un registro por ID
// @route   DELETE /api/users/delete-type-values/:id
// @access  Private
const deleteTypeValues = asyncHandler(async (req, res) => {
  const typeValuesId = req.params.id;

  const removedTypeValues = await TypeValues.removeById(typeValuesId);

  if (removedTypeValues) {
    res.json({ message: 'TypeValues eliminado con éxito' });
  } else {
    res.status(404);
    throw new Error('TypeValues no encontrado');
  }
});

// @desc    Obtener un registro por ID
// @route   GET /api/users/get-type-values/:id
// @access  Private
const getTypeValues = asyncHandler(async (req, res) => {
  try {
    const typeValues = await TypeValues.findById(req.params.id);

    if (typeValues) {
      if (typeValues.idUsuario.toString() === req.user._id.toString()) {
        res.json(typeValues);
      } else {
        res.status(403);
        throw new Error('No tienes permiso para acceder a este TypeValues');
      }
    } else {
      res.status(404);
      throw new Error('TypeValues no encontrado');
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el TypeValues', error: error.message });
  }
});

// @desc    Obtener registros por ID de usuario
// @route   GET /api/users/get-type-values/:idUsuario
// @access  Private
const getTypeValuesByUserId = asyncHandler(async (req, res) => {
  const userId = req.params.idUsuario;

  try {
    const typeValues = await TypeValues.find({ idUsuario: userId });

    if (typeValues) {
      res.json(typeValues);
    } else {
      res.status(404);
      throw new Error('No se encontraron TypeValues para este usuario');
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los TypeValues', error: error.message });
  }
});

export {
  addTypeValues,
  updateTypeValues,
  deleteTypeValues,
  getTypeValues,
  getTypeValuesByUserId,
};
