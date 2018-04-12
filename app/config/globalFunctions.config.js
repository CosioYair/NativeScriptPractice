"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var server_config_1 = require("./server.config");
var constants_config_1 = require("./constants.config");
exports.GLOBALFUNCTIONS = {
    getWarehouses: getWarehouses,
    getWarehouseByCode: getWarehouseByCode,
    getWarehouseByName: getWarehouseByName
};
function getWarehouses() {
    var warehousesFilter = [];
    if (server_config_1.SERVER.user["SupervisorRights"] == "Y") {
        constants_config_1.CONSTANTS.warehouses.map(function (warehouse) {
            warehousesFilter.push(warehouse.name);
        });
    }
    else {
        constants_config_1.CONSTANTS.warehouses.map(function (warehouse) {
            if (warehouse.code == server_config_1.SERVER.user["SalesDefaultOrderWhse"] || warehouse.code == "000")
                warehousesFilter.push(warehouse.name);
        });
    }
    return warehousesFilter;
}
function getWarehouseByCode(code) {
    var warehouseSearch = {};
    constants_config_1.CONSTANTS.warehouses.map(function (warehouse) {
        if (warehouse.code == code)
            warehouseSearch = warehouse;
    });
    return warehouseSearch;
}
function getWarehouseByName(name) {
    var warehouseSearch = {};
    constants_config_1.CONSTANTS.warehouses.map(function (warehouse) {
        if (warehouse.name == name)
            warehouseSearch = warehouse;
    });
    return warehouseSearch;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xvYmFsRnVuY3Rpb25zLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdsb2JhbEZ1bmN0aW9ucy5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxpREFBeUM7QUFDekMsdURBQStDO0FBRWxDLFFBQUEsZUFBZSxHQUFHO0lBQzNCLGFBQWEsRUFBRSxhQUFhO0lBQzVCLGtCQUFrQixFQUFFLGtCQUFrQjtJQUN0QyxrQkFBa0IsRUFBRSxrQkFBa0I7Q0FDekMsQ0FBQztBQUVGO0lBQ0ksSUFBSSxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7SUFDMUIsRUFBRSxDQUFBLENBQUMsc0JBQU0sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQSxDQUFDO1FBQ3ZDLDRCQUFTLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxVQUFBLFNBQVM7WUFDOUIsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMxQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDRCxJQUFJLENBQUEsQ0FBQztRQUNELDRCQUFTLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxVQUFBLFNBQVM7WUFDOUIsRUFBRSxDQUFBLENBQUMsU0FBUyxDQUFDLElBQUksSUFBSSxzQkFBTSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLFNBQVMsQ0FBQyxJQUFJLElBQUksS0FBSyxDQUFDO2dCQUNqRixnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzlDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNELE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQztBQUM1QixDQUFDO0FBRUQsNEJBQTRCLElBQUk7SUFDNUIsSUFBSSxlQUFlLEdBQUcsRUFBRSxDQUFDO0lBQ3pCLDRCQUFTLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxVQUFBLFNBQVM7UUFDOUIsRUFBRSxDQUFBLENBQUMsU0FBUyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUM7WUFDdEIsZUFBZSxHQUFHLFNBQVMsQ0FBQztJQUNwQyxDQUFDLENBQUMsQ0FBQztJQUNILE1BQU0sQ0FBQyxlQUFlLENBQUM7QUFDM0IsQ0FBQztBQUVELDRCQUE0QixJQUFJO0lBQzVCLElBQUksZUFBZSxHQUFHLEVBQUUsQ0FBQztJQUN6Qiw0QkFBUyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsVUFBQSxTQUFTO1FBQzlCLEVBQUUsQ0FBQSxDQUFDLFNBQVMsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDO1lBQ3RCLGVBQWUsR0FBRyxTQUFTLENBQUM7SUFDcEMsQ0FBQyxDQUFDLENBQUM7SUFDSCxNQUFNLENBQUMsZUFBZSxDQUFDO0FBQzNCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTRVJWRVIgfSBmcm9tIFwiLi9zZXJ2ZXIuY29uZmlnXCI7XG5pbXBvcnQgeyBDT05TVEFOVFMgfSBmcm9tIFwiLi9jb25zdGFudHMuY29uZmlnXCI7XG5cbmV4cG9ydCBjb25zdCBHTE9CQUxGVU5DVElPTlMgPSB7XG4gICAgZ2V0V2FyZWhvdXNlczogZ2V0V2FyZWhvdXNlcyxcbiAgICBnZXRXYXJlaG91c2VCeUNvZGU6IGdldFdhcmVob3VzZUJ5Q29kZSxcbiAgICBnZXRXYXJlaG91c2VCeU5hbWU6IGdldFdhcmVob3VzZUJ5TmFtZVxufTtcblxuZnVuY3Rpb24gZ2V0V2FyZWhvdXNlcygpe1xuICAgIGxldCB3YXJlaG91c2VzRmlsdGVyID0gW107XG4gICAgaWYoU0VSVkVSLnVzZXJbXCJTdXBlcnZpc29yUmlnaHRzXCJdID09IFwiWVwiKXtcbiAgICAgICAgQ09OU1RBTlRTLndhcmVob3VzZXMubWFwKHdhcmVob3VzZSA9PiB7XG4gICAgICAgICAgICB3YXJlaG91c2VzRmlsdGVyLnB1c2god2FyZWhvdXNlLm5hbWUpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgQ09OU1RBTlRTLndhcmVob3VzZXMubWFwKHdhcmVob3VzZSA9PiB7XG4gICAgICAgICAgICBpZih3YXJlaG91c2UuY29kZSA9PSBTRVJWRVIudXNlcltcIlNhbGVzRGVmYXVsdE9yZGVyV2hzZVwiXSB8fCB3YXJlaG91c2UuY29kZSA9PSBcIjAwMFwiKVxuICAgICAgICAgICAgICAgIHdhcmVob3VzZXNGaWx0ZXIucHVzaCh3YXJlaG91c2UubmFtZSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gd2FyZWhvdXNlc0ZpbHRlcjtcbn1cblxuZnVuY3Rpb24gZ2V0V2FyZWhvdXNlQnlDb2RlKGNvZGUpe1xuICAgIGxldCB3YXJlaG91c2VTZWFyY2ggPSB7fTtcbiAgICBDT05TVEFOVFMud2FyZWhvdXNlcy5tYXAod2FyZWhvdXNlID0+IHtcbiAgICAgICAgaWYod2FyZWhvdXNlLmNvZGUgPT0gY29kZSlcbiAgICAgICAgICAgIHdhcmVob3VzZVNlYXJjaCA9IHdhcmVob3VzZTtcbiAgICB9KTtcbiAgICByZXR1cm4gd2FyZWhvdXNlU2VhcmNoO1xufVxuXG5mdW5jdGlvbiBnZXRXYXJlaG91c2VCeU5hbWUobmFtZSl7XG4gICAgbGV0IHdhcmVob3VzZVNlYXJjaCA9IHt9O1xuICAgIENPTlNUQU5UUy53YXJlaG91c2VzLm1hcCh3YXJlaG91c2UgPT4ge1xuICAgICAgICBpZih3YXJlaG91c2UubmFtZSA9PSBuYW1lKVxuICAgICAgICAgICAgd2FyZWhvdXNlU2VhcmNoID0gd2FyZWhvdXNlO1xuICAgIH0pO1xuICAgIHJldHVybiB3YXJlaG91c2VTZWFyY2g7XG59Il19