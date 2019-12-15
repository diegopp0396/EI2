import React, { Component } from "react";
import axios from "axios";
import classes from "./Profile.module.css";
import UserProfile from "./userProfile/userProfile";


class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: this.props.location.email,
            token: this.props.location.auth,
            profile: null,
            experience: null,
            error: false,
        };
        this.setProfile();
    }

    async getProfile(initProfile, initExperience) {

        await axios.get("/api/profile/", { headers: { 'Authorization': this.state.token } })
            .then(res => {
                this.setState({ profile: res.data, error: false })
            }).catch(err => {
                this.setState({ error: true })
            });


        if (this.state.profile === null || this.state.error === true) {

            await axios.post("/api/profile/", initProfile, { headers: { 'Authorization': this.state.token } })
                .then(res => {
                    this.setState({ profile: res.data, experience: true })
                }).catch(err => {
                    this.setState({ error: true })
                });


            if (this.state.experience != null) {
                await axios.post("/api/profile/experience", initExperience, { headers: { 'Authorization': this.state.token } })
                    .then(res => {
                        this.setState({ profile: res.data })
                    }).catch(err => {
                        this.setState({ error: true })
                    });
            }
        }
    }


    setProfile() {
        const newProfile = {
            handle: this.state.email,
            status: "active",
            skills: "Skill 1, Skill 2"
        };

        const newExperience = {
            title: "",
            company: "",
            location: "",
            from: "",
            to: "",
            current: false,
            description: ""
        };

        this.getProfile(newProfile, newExperience)

    }

    onChange = (e) => {
        let arr = e.target.name.split("::")
        let oldProfile = this.state.profile;
        if (arr.length === 1) {
            oldProfile[arr[0]] = e.target.value;
        }
        if (arr.length === 2) {
            oldProfile[arr[0]][arr[1]] = e.target.value;
        }
        if (arr.length === 3) {
            oldProfile[arr[0]][arr[1]][arr[2]] = e.target.value;
        }
        this.setState({ profile: oldProfile });
    }

    onSubmit = (e) => {
        e.preventDefault();

        let submittedProfile = this.state.profile;

        submittedProfile.skills = submittedProfile.skills.toString();


        console.log(JSON.stringify(this.state.profile))
        console.log(JSON.stringify(submittedProfile))

        axios.post("/api/profile/", submittedProfile, { headers: { 'Authorization': this.state.token } })
            .then(res => {
                this.setState({ profile: res.data })
            }).catch(err => {
                console.log("ERROR: "+err)
                this.setState({ error: true })
            });
    }

    render() {

        let userProf = this.state.profile != null ? <UserProfile submitted={this.onSubmit} changed={this.onChange} profile={this.state.profile} /> : "Loading"
        if (this.state.error === true) {
            userProf = <div className={classes.Error}>
                <h1 >There is an error loading your profile!</h1>
            </div>
        }

        return (
            <div>
                {userProf}
            </div>

        );
    }
}
export default Profile;
