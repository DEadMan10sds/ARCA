
module.exports = (sequelize, DataTypes) => {
    const List = sequelize.define("List", {
        tickets: 
        {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    });

    return List;
}