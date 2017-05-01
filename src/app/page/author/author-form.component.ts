import {Component, OnInit} from "@angular/core";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Author, AuthorRepository} from "../../model/entity/author.model";
import {ActivatedRoute, Router} from "@angular/router";
import * as _ from "lodash";
import {getNearestParentPath} from "./utils";

@Component({
    selector: 'author-form',
    moduleId: module.id,
    templateUrl: 'author-form.component.html',
})
export class AuthorForm implements OnInit {
    form: FormGroup;
    author: Author;
    id: number;
    parentPath: string;

    constructor(private fb: FormBuilder, private route: ActivatedRoute, private rep: AuthorRepository,
                private router: Router) {
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.id = params['id'];
            this.rep.getAuthor(this.id).subscribe(this.setAuthor.bind(this));
        });

        this.parentPath = getNearestParentPath(this.route);
    }

    private createForm() {
        this.form = this.fb.group({
            name: [this.author.name, Validators.required],
        })
    }

    private setAuthor(author: Author) {
        this.author = author;
        this.createForm();
    }

    getInputClass(name: string): Object {
        let input: AbstractControl = this.form.get(name);
        return {
            'uk-form-danger': input.dirty && input.status == 'INVALID',
        }
    }

    onSubmit() {
        if (this.form.invalid) return;

        _.extend(this.author, this.form.value);
        this.rep.update(this.author).subscribe(author => this.router.navigate([
            this.parentPath, 'list', 1
        ]));
    }
}
