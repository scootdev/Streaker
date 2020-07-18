// Creating our Days Goal is Complete model
module.exports = function (sequelize, DataTypes) {
    const Days = sequelize.define("Days", {
        dateCompleted: {
            type: DataTypes.DATEONLY,
            allowNull: false
        }
    }, {
        timestamps: false
    });

    Days.associate = function (models) {
        Days.belongsTo(models.Goals, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Days;
};