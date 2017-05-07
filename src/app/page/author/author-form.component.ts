import {Component, OnInit} from "@angular/core";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Author, AuthorRepository} from "../../model/entity/author.model";
import {ActivatedRoute, Router} from "@angular/router";
import * as _ from "lodash";
import {getNearestParentPath} from "./utils";
import {RouteBuilder} from "../../shared/service/route-builder.service";

@Component({
    selector: 'author-form',
    moduleId: module.id,
    templateUrl: 'author-form.component.html',
})
export class AuthorForm implements OnInit {
    form: FormGroup;
    author: Author;
    id: number;

    constructor(private fb: FormBuilder, private route: ActivatedRoute, private repo: AuthorRepository,
                private router: Router, private routeBuilder: RouteBuilder) {
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.id = params['id'];
            if (!this.id) return this.initEmptyAuthor();
            this.repo.getAuthor(this.id).subscribe(this.setAuthor.bind(this));
        });
    }

    getInputClass(name: string): Object {
        let input: AbstractControl = this.form.get(name);
        return {
            'uk-form-danger': input.dirty && input.status == 'INVALID',
        }
    }

    getModeLabel(): string {
        if (this.author.author_id) return 'edit';
        return 'add'
    }

    onSubmit() {
        if (this.form.invalid) return;

        _.extend(this.author, this.form.value);
        this.repo.save(this.author).subscribe(author => this.router.navigate([
            this.routeBuilder.prefix, 'list', 1
        ]));
    }

    private initEmptyAuthor(): void {
        this.setAuthor(new Author);
        this.createForm();
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
}
