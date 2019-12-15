import React from 'react';
import classes from './userProfile.module.css';

const userProfile = (props) => {

    let handle = (props.profile.handle != null) ? (<div className="form-group">
        <input
            key="handle"
            type="text"
            className="form-control form-control-lg"
            placeholder="Set a handle here"
            name={"handle"}
            value={props.profile.handle}
            onChange={props.changed}
            required
        />
    </div>) : null;

    let company = (props.profile.company != null) ? (<div className="form-group">
        <input
            key="company"
            type="text"
            className="form-control form-control-lg"
            placeholder="Set a company here"
            name={"company"}
            value={props.profile.company}
            onChange={props.changed}
        />
    </div>) : null;

    let website = (props.profile.website != null) ? (<div className="form-group">
        <input
            key="website"
            type="text"
            className="form-control form-control-lg"
            placeholder="Set your website here"
            name={"website"}
            value={props.profile.website}
            onChange={props.changed}
        />
    </div>) : null;

    let location = (props.profile.location != null) ? (<div className="form-group">
        <input
            key="location"
            type="text"
            className="form-control form-control-lg"
            placeholder="Set a location here"
            name={"location"}
            value={props.profile.location}
            onChange={props.changed}
        />
    </div>) : null;

    let bio = (props.profile.bio != null) ? (<div className="form-group">
        <input
            key="bio"
            type="text"
            className="form-control form-control-lg"
            placeholder="Set a bio here"
            name={"bio"}
            value={props.profile.bio}
            onChange={props.changed}
        />
    </div>) : null;

    let githubusername = (props.profile.githubusername != null) ? (<div className="form-group">
        <input
            key="githubusername"
            type="text"
            className="form-control form-control-lg"
            placeholder="Set your githubusername here"
            name={"githubusername"}
            value={props.profile.githubusername}
            onChange={props.changed}
        />
    </div>) : null;

    let skills = props.profile.skills.map((val, key) => {
        return (<div key={"skill" + key} className="form-group">
            <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Set your skill here"
                name={"skills::" + key}
                value={val}
                onChange={props.changed}
                required
            />
        </div>)
    });

    let experience = props.profile.experience.map((exp, keyExp) => {

        let keys = []
        let obj = []
        Object.keys(exp).forEach((key) => {
            keys.push(key)
            obj.push(exp[key])
        });


        return (obj.map((item, key) => {
            if (keys[key] !== 'current' && keys[key] !== '_id') {
                return (
                    <div key={"experience::" + keyExp + "::" + keys[key]} className="form-group">
                        <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder={"Set " + keys[key] + " here!!"}
                            name={"experience::" + keyExp + "::" + keys[key]}
                            value={item != null ? item : ""}
                            onChange={props.changed}
                        />
                    </div>)
            }
            return "";
        }))
    });

    let education = props.profile.education.map((edu, keyEd) => {

        let keys = []
        let obj = []
        Object.keys(edu).forEach((key) => {
            keys.push(key);
            obj.push(edu[key]);
        });



        return (obj.map((item, key) => {
            if (keys[key] !== 'current' && keys[key] !== '_id') {
                return (
                    <div key={"education::" + keyEd + "::" + keys[key]} className="form-group">
                        <input
                            type={(keys[key] === 'from' || keys[key] === 'to') ? "date" : "text"}
                            className="form-control form-control-lg"
                            placeholder={"Set " + keys[key] + " here!!"}
                            name={"education::" + keyEd + "::" + keys[key]}
                            value={item}
                            onChange={props.changed}
                        />
                    </div>
                )
            }
            return "";
        }))
        //console.log(objetos);
        //return objetos;
    });


    let arr = [];
    Object.keys(props.profile.social).forEach((key) => {
        //console.log("[SOCIAL]: "+key+" "+val)
        arr.push(
            <div key={"social::" + key} className="form-group">
                <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder={"Set your " + key + " here!!"}
                    name={"social::" + key}
                    value={props.profile.social[key]}
                    onChange={props.changed}
                />
            </div>
        )
    })

    let socialNetworks = arr.map(item => {
        return item
    })




    return (
        <div className={classes.UserProfile}>
            <div className={classes.Profile}>
                <img className={classes.Image} src={props.profile.user.avatar} alt="Logo" />
                <h1>Welcome {props.profile.user.name}</h1>
                <h3>{props.profile.user.email}</h3>
            </div>

            <form onSubmit={props.submitted}>
                <h2>Handle: </h2>
                {handle}
                <h2>Company: </h2>
                {company}
                <h2>Website: </h2>
                {website}
                <h2>Location: </h2>
                {location}
                <h2>Bio: </h2>
                {bio}
                <h2>Git Hub Username: </h2>
                {githubusername}
                <h2>Skills: </h2>
                {skills}
                <h2>Experience: </h2>
                {experience}
                <h2>Education: </h2>
                {education}
                <h2>Social Networks: </h2>
                {socialNetworks}
                <input
                    type="submit"
                    className="btn btn-info btn-block mt-4"
                    value="Save Changes"
                />
            </form>
        </div>
    );
};

export default userProfile;