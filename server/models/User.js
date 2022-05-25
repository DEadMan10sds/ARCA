
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        surname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: true,
                allowNull: false,
            }
        },
        phoneNumber: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        birth: {
            type: DataTypes.DATEONLY,
            validate: {
                isDate: true,
            }
        }
    });

    return User;
}