
module.exports = (sequelize, DataTypes) => {
    const Event = sequelize.define("Event", {
        name:
        {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        price:{
            type: DataTypes.FLOAT,
            validate:{
                isFloat: true,
                allowNull: false,
            }
        },
        active:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        date:{
            type: DataTypes.DATEONLY,
            validate:{
                isDate: true,
                allowNull: false,
            }
        },
        payDate:{
            type: DataTypes.DATEONLY,
            validate: {
                isDate: true,
                allowNull: false,
            }
        },
        image: {
            type: DataTypes.BLOB
        }
    });

    return Event;
}