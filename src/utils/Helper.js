class Helper {
    static createOptions(data, valueField, labelField) {
        return data.map((item) => ({
            value: item[valueField],
            label: item[labelField],
        }));
    }
}
export default Helper;