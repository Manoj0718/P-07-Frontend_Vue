<template>
    <div class="container">
        <div class="has-text-white is-family-code has-text-weight-medium">
            <label class="checkbox">

                <!-- //* Resource : https://vuejs.org/v2/guide/forms.html#Checkbox -->

                <input type="checkbox" @click="checkPostSeen()" v-model="toggle" checked="booleanValue"
                    true-value=postIds false-value="no" :value="postId">
                I have Seen This Post.
            </label>
            <br>
            <p class="is-family-code has-text-weight-medium has-text-white">{{message}} </p>
        </div>
    </div>
</template>

<script>
    import Userservices from "../store/services/user_services";

    export default {
        name: "CheckBoxForPost",
        props: ["post", "postId"],

        data() {
            return {
                toggle: "",
                message: "",
            }
        },
        methods: {
            checkPostSeen() {
                // this.checkPost = !this.checkPost;
                this.toggle = !this.toggle;
                console.log("clicked", this.postId);
                console.log("clicked toggle", this.toggle);

                let data = {
                    postId: this.postId
                };
                console.log("data before check true or false", data);

                if (this.toggle === true) {
                    console.log("sent data after true", data);

                    Userservices.markPost(data).then((responce) => {
                        console.log("responce:", responce);
                        this.message = "You have marked this post as seen . "

                    }).catch((err) => {
                        this.message = "Something went wrong.  "
                        console.log("err:", err.message);
                    })
                } else {
                    console.log("You have marked this post as seen already(FrontEnd)")
                }
            },
        }
    }
</script>