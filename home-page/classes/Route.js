class Route{
    constructor(route_description, user_id, is_ordered, tag_id){
        this.route = [];
        this.route_description = route_description;
        this.user_id = user_id;
        this.is_ordered = is_ordered;
        this.tag_id = tag_id;

    }
    GetRoute(){
        return this.route;
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
    StorePlaceRoute(place_id){
        //Accesses the database by calling the store_place_home.php script
        xhr = new XMLHttpRequest();
        xhr.open("POST", "store_placeroute.php", true);
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
        xhr.send("place_id=" + place_id);
    }

    StoreRoute(){

        let xhr = new XMLHttpRequest();
        
        xhr.open("POST", "classes/store_route.php", true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        //Checks and alerts that request was successful (indicated by a status of 200)
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {

                if (xhr.status === 200) {
                    const response_text = xhr.responseText;
                    document.getElementById("responseContainer").innerHTML = response_text;
                } 
                else {
                    console.error('Error occurred: ' + xhr.status);
                }
            }
        };
        xhr.send("route_description=" + this.route_description + "&user_id=" + this.user_id + "&is_ordered=" + this.is_ordered + "&tag_id=" + this.tag_id);

        // for (let i = 0; i < this.route.length; i++){
        //     let current_place = this.route[i];
        //     let place_id = current_place.id;
        //     this.StorePlaceRoute(place_id);
        // }
        }
}