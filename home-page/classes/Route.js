class Route{
    constructor(route_description, user_id, is_ordered = 1, tag_id = 0){
        this.route = [];
        this.route_id = null;
        this.route_description = route_description;
        this.user_id = user_id;
        this.is_ordered = is_ordered;
        this.tag_id = tag_id;

    }
    GetRoute(){
        return this.route;
    }
    GetRouteAsNames(){
        let temp_route = [];
        for (let i = 0; i < this.route.length; i++){
            temp_route.push(this.route[i].place_name);
        }
        return temp_route;
    }
    GetRouteAsIds(){
        let temp_route = [];
        for (let i = 0; i < this.route.length; i++){
            temp_route.push(this.route[i].id);
        }
        return temp_route;
    }
    SetRouteDescription(text){
        this.route_description = text;
    }
    SetRouteId(id){
        this.route_id = id;
    }
    AddPlace(place){
        this.route.push(place);
    }
    RemovePlace(index){
        this.route.splice(index, 1);
    }
    PopPlace(){
        return this.route.pop();
    }

    //stores a single record in the PlaceRoute Table using the passed in place_id, and this objects route_id
    StorePlaceRoute(place_id, order){

        //Accesses the database by calling the script
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "classes/store_placeroute.php", true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");


        //Checks and alerts that request was successful (indicated by a status of 200)
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    const response_text = xhr.responseText;
                } 
                else {
                    console.error('Error occurred: ' + xhr.status);
                }
            }
        };
        xhr.send("place_id=" + place_id + "&route_id=" + this.route_id + "&order=" + order);
    }

    //stores a single record in the Route Table
    StoreRoute(){
        let xhr = new XMLHttpRequest();
        let self = this;

        xhr.open("POST", "classes/store_route.php", true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        //Checks and alerts that request was successful (indicated by a status of 200)
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    const response_text = xhr.responseText;
                    let this_route_id = parseInt(response_text);
                    self.route_id = this_route_id;

                    //After the route has been stored, store the necessary PlaceRoute records using the previous function
                    for (let i = 0; i < self.route.length; i++){
                        let current_place = self.route[i];
                        let place_id = current_place.id;
                        self.StorePlaceRoute(place_id, i);
                    }
                    document.getElementById("routeResponseContainer").innerHTML = "Route Successfully stored!"; //change this to show up in the make route section
                    SetDelayedFunction(function() {
                        document.getElementById("routeResponseContainer").innerHTML = "";
                    }, 5000);
                    document.getElementById("loading-container").style.display = "none";
                } 
                else {
                    console.error('Error occurred: ' + xhr.status);
                }
            }
        };
        xhr.send("route_description=" + this.route_description + "&user_id=" + this.user_id + "&is_ordered=" + this.is_ordered + "&tag_id=" + this.tag_id);
        }
}