import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Author, AuthorRepository} from "../../model/entity/author.model";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'author-form',
    moduleId: module.id,
    templateUrl: 'author-form.component.html',
})
export class AuthorForm implements OnInit {
    form: FormGroup;
    author: Author;
    id: number;

    constructor(private fb: FormBuilder, private route: ActivatedRoute, private rep: AuthorRepository) {
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.id = params['id'];
            this.rep.getAuthor(this.id).subscribe(this.setAuthor.bind(this));
        });
    }

    private createForm() {
        this.form = this.fb.group({
            name: this.author.name,
        })
    }

    private setAuthor(author: Author) {
        this.author = author;
        this.createForm();
    }
}
