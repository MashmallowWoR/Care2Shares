import DataType from 'sequelize';
import Model from '../../sequelize';

const SearchHistory = Model.define('SearchHistory',{
    id: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    userId: {
        type: DataType.STRING,
        allowNull: true
    },
    lat: {
        type: DataType.FLOAT,
        allowNull: true
    },
    lng: {
        type: DataType.FLOAT,
        allowNull: true
    },
    location: {
        type: DataType.STRING,
        allowNull: true
    }
});

export default SearchHistory