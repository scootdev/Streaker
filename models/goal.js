// Creating our Goal model
module.exports = function (sequelize, DataTypes) {
    const Goal = sequelize.define("Goal", {
        goalDes: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        startDate: {
            type: DataTypes.DATE,
            allowNull: true
        },
        endDate: {
            type: DataTypes.DATE,
            allowNull: true
        },
        color: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: false
    });

    Goal.associate = function (models) {
        Goal.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Goal;
};
