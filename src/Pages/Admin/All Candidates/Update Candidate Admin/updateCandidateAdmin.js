import react, { useEffect, useState } from 'react'
import axios from 'axios';
import { useForm } from "react-hook-form";
import ApiConstants from "../../../../Services/apiconstants";
// import '../Update Candidate Admin/updateCandidateAdmin.css'

export default function UpdateCandidateAdmin(props) {
    const [adminId, setAdminId] = useState('');
    const [token, setToken] = useState('');

    const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm();

    const candidateData = () => {
        axios.post(ApiConstants.CANDIDATE_DATA_BY_ID, { id: props.candidateId }).then((response) => {

            // console.log(response);
            // setCandidateDataById(response.data.candidate)

            setValue("fullname", response.data.candidate.fullname)
            setValue("country", response.data.candidate.country)
            setValue("currentCity", response.data.candidate.currentCity)
            setValue("currentCompany", response.data.candidate.currentCompany)
            setValue("currentRole", response.data.candidate.currentRole)
            setValue("email", response.data.candidate.email)
            setValue("expectedRateC2CorC2H", response.data.candidate.expectedRateC2CorC2H)
            setValue("experience", response.data.candidate.experience)
            setValue("experienceDescription", response.data.candidate.experienceDescription)
            setValue("interestedRole", response.data.candidate.interestedRole)
            setValue("knownTechnologies", response.data.candidate.knownTechnologies)
            setValue("linkedInUrl", response.data.candidate.linkedInUrl)
            setValue("needVisaSponsorship", response.data.candidate.needVisaSponsorship)
            setValue("phone", response.data.candidate.phone)
            setValue("relocation", response.data.candidate.relocation)
            setValue("timeToJoin", response.data.candidate.timeToJoin)
            setValue("typeOfJob", response.data.candidate.typeOfJob)

        }).catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        candidateData();
        setAdminId(JSON.parse(sessionStorage.getItem('ADMIN')).admin._id);
        setToken(JSON.parse(sessionStorage.getItem('ADMIN')).token)
    }, [props.candidateId])

    const onSubmit = (data) => {
        console.log(data)
        axios.patch(ApiConstants.ADMIN_CANDIDATE_UPDATE,
            {
                id: props.candidateId,
                fullname: data.fullname,
                country: data.country,
                currentCity: data.currentCity,
                currentCompany: data.currentCompany,
                currentRole: data.currentRole,
                email: data.email,
                expectedRateC2CorC2H: data.expectedRateC2CorC2H,
                experience: data.experience,
                experienceDescription: data.experienceDescription,
                interestedRole: data.interestedRole,
                knownTechnologies: data.knownTechnologies,
                linkedInUrl: data.linkedInUrl,
                needVisaSponsorship: data.needVisaSponsorship,
                phone: data.phone,
                relocation: data.relocation,
                timeToJoin: data.timeToJoin,
                typeOfJob: data.typeOfJob,

            }, {
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json",
                '_id': adminId,
                'token': token,
                'Access-Control-Allow-Origin': true,
                "Access-Control-Allow-Methods": "GET, POST, PATCH"
            }
        }).then((response) => {

            console.log(response);

        }).catch(err => {
            console.log(err);
        })
    }




    return (
        <>
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Update Candidate</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div class="form-row">
                                    <label for="exampleFormControlTextarea1">Full Name</label>
                                    <input type="text" class="form-control mb-2"
                                        {...register("fullname")}
                                    />
                                </div>

                                <div class="form-row">
                                    <label for="exampleFormControlTextarea1">Phone Number</label>
                                    <input type="tel" class="form-control mb-2"
                                        {...register("phone")}
                                    />
                                </div>
                                <div class="form-row">
                                    <label for="exampleFormControlTextarea1">Email</label>
                                    <input type="email" class="form-control mb-2"
                                        {...register("email")}
                                    />
                                </div>
                                <div class="form-row">
                                    <label for="exampleFormControlTextarea1">LinkedIn url</label>
                                    <input type="url" class="form-control mb-2"
                                        {...register("linkedInUrl")}
                                    />
                                </div>

                                <div class="form-row">
                                    <div class="col">
                                        <label for="exampleFormControlTextarea1">Country</label>
                                        <input type="text" class="form-control"
                                            {...register("country")}
                                        />
                                    </div>
                                    <div class="col">
                                        <label for="exampleFormControlTextarea1">Current City</label>
                                        <input type="text" class="form-control"
                                            {...register("currentCity")}
                                        />
                                    </div>
                                </div>

                                <div class="form-row mt-2">
                                    <div class="col">
                                        <label for="exampleFormControlSelect1">Relocate</label>
                                        <select class="form-control"  {...register("relocation")}  >
                                            <option value={false} >No</option>
                                            <option value={true} >Yes</option>
                                        </select>
                                    </div>
                                    <div class="col">
                                        <label for="exampleFormControlSelect1">Job Type</label>
                                        <input type="text" class="form-control"
                                            {...register("typeOfJob")}
                                        />
                                    </div>
                                </div>

                                <div class="form-row mt-4">
                                    <div class="col">
                                        <label for="exampleFormControlSelect1">When can you join(Week)</label>
                                        <select class="form-control" {...register("timeToJoin")} >
                                            <option value="1" >1</option>
                                            <option value="2">2</option>
                                            <option value="1" >3</option>
                                            <option value="2">4</option>
                                        </select>
                                    </div>
                                    <div class="col">
                                        <label for="exampleFormControlSelect1"> Total Overall Experience</label>
                                        <input type="number" class="form-control"
                                            {...register("experience")}
                                        />
                                    </div>
                                </div>

                                <div class="form-row mt-2">
                                    <div class="col">
                                        <label for="exampleFormControlSelect1">visa status</label>
                                        <select class="form-control" {...register("needVisaSponsorship")} >
                                            <option value={false} >No</option>
                                            <option value={true}>Yes</option>
                                        </select>
                                    </div>
                                    <div class="col">
                                        <label for="exampleFormControlSelect1">Expected salery</label>
                                        <input type="number" class="form-control"
                                            {...register("expectedRateC2CorC2H")}
                                        />
                                    </div>
                                </div>


                                <div class="form-row mt-2">
                                    <label for="exampleFormControlSelect1">Current Company</label>
                                    <input type="text" class="form-control mb-2"
                                        {...register("currentCompany")}
                                    />
                                </div>

                                <div class="form-row mt-2">
                                    <label for="exampleFormControlSelect1">Current Role</label>
                                    <input type="text" class="form-control mb-2"
                                        {...register("interestedRole")}
                                    />
                                </div>

                                <div class="form-row mt-2">
                                    <label for="exampleFormControlSelect1">Technologies /Tools you are good</label>
                                    <input type="text" class="form-control mb-2"
                                        {...register("knownTechnologies")}
                                    />
                                </div>


                                <div class="form-row mt-2">
                                    <label for="exampleFormControlTextarea1">Brief Description about your skill</label>
                                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"
                                        {...register("experienceDescription")}
                                    />
                                </div>

                                <div class="modal-footer" >
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="submit" class="btn btn-primary">Update</button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
