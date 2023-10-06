import mongoose from 'mongoose';

const typeValuesSchema = mongoose.Schema(
  {
    typevalue: {
      type: String,
      required: true,
    },
    subtype: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    idUsuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Hace referencia al modelo de usuario
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Método para eliminar registros por ID
typeValuesSchema.statics.removeById = async function (typeValuesId) {
  return this.findByIdAndRemove(typeValuesId);
};

const TypeValues = mongoose.model('TypeValues', typeValuesSchema);

export default TypeValues;
