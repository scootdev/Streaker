// Creating our Goal model
module.exports = function(sequelize, DataTypes) {
  const Goals = sequelize.define(
    "Goals",
    {
      goalDes: {
        type: DataTypes.STRING,
        allowNull: false
      },
      date: {
        type: DataTypes.STRING,
        allowNull: true
      },
      longterm: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      color: {
        type: DataTypes.STRING,
        allowNull: false
      },
      completed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    },
    {
      timestamps: false
    }
  );

  Goals.associate = function(models) {
    Goals.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Goals;
};
