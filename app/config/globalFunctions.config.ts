import { SERVER } from "./server.config";
import { CONSTANTS } from "./constants.config";

export const GLOBALFUNCTIONS = {
    getWarehouses: getWarehouses
};

function getWarehouses(){
    let warehousesFilter = [];
    if(SERVER.user["SupervisorRights"] == "Y"){
        CONSTANTS.warehouses.map(warehouse => {
            warehousesFilter.push(warehouse.name);
        });
    }
    else{
        CONSTANTS.warehouses.map(warehouse => {
            if(warehouse.code == SERVER.user["SalesDefaultOrderWhse"] || warehouse.code == "000")
                warehousesFilter.push(warehouse.name);
        });
    }
    return warehousesFilter;
}