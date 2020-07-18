// Creating our Goal model
module.exports = function(sequelize, DataTypes) {
  const Goals = sequelize.define(
    "Goals",
    {
      goalDes: {
        type: DataTypes.STRING,
        allowNull: false
      },
      startDate: {
        type: DataTypes.DATEONLY,
        allowNull: true
      },
      endDate: {
        type: DataTypes.DATEONLY,
        allowNull: true
      },
      color: {
        type: DataTypes.STRING,
        allowNull: false
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
