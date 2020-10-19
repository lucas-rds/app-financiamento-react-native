
let _data = {};
const _callbacks = [];
_notify = () => _callbacks.forEach(callback => callback(_data));

const DataHolder = {
    subscribe: (callback) => _callbacks.push(callback),
    setData: (newData) => {
        _data = { ..._data, ...newData };
        _notify();
    },
    getData: () => _data
};

module.exports = DataHolder;