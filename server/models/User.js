
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
            allowNull: false,
            validate: {
                isEmail: true,
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
        }, 
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'user'
        }
    });

    User.associate = (models) => {
        User.hasMany(models.List, {onDelete: 'CASCADE'});
    }

    return User;
}