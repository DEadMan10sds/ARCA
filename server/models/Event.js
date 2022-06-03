
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
            allowNull: false,
            validate:{
                isFloat: true,
            }
        },
        quota: {
            type: DataTypes.INTEGER,
            allowNull: false, 
        },
        restantQuota: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        active:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        date:{
            type: DataTypes.DATEONLY,
            allowNull: false,
            validate:{
                isDate: true,
            }
        },
        payDate:{
            type: DataTypes.DATEONLY,
            allowNull: false,
            validate: {
                isDate: true,
            }
        },
        image: {
            type: DataTypes.BLOB
        }
    });

    Event.associate = (models) => {
        Event.hasMany(models.List, {onDelete: 'CASCADE'});
    }

    return Event;
}