import {Component, OnInit, OnChanges} from '@angular/core';
import {ServerRequestsService} from "../../server-requests.service";
import {Person} from "../../classes/person";
import {Input} from "@angular/core/src/metadata/directives";

@Component({
    selector: 'app-person-info',
    templateUrl: './person-info.component.html',
    styleUrls: ['./person-info.component.css']
})
export class PersonInfoComponent implements OnChanges {

    @Input() person: Person;
    private default_url = "default-profile.jpg";
    private picture_url = "default-profile.jpg";

    constructor(private serverRequestsService: ServerRequestsService) {
    }

    ngOnChanges(){
        if (this.person != null) {
            let moviedb_id = this.person.moviedb_id;
            let url = "https://api.themoviedb.org/3/person/" + moviedb_id + "/images?api_key=d4d78a6e08d09913f70499a86c58e426";
            this.serverRequestsService.getPersonImage(url).subscribe(this.image_return)
        }
    }

    image_return = (data)  => {
        let path = data.profiles[0];
        if(path == null){
            this.picture_url = this.default_url;
            return;
        }
        this.picture_url = "http://image.tmdb.org/t/p/w185" + path.file_path;
    }
}
