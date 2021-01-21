import React, { PureComponent } from 'react';
import '../style/CreatePet.css'
import { createPet, uploadPetProfilePicture } from '../fetches/pet-fetches.js';
import { MainContext } from '../MainContext.js';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css'

export default class CreatePet extends PureComponent {
    static contextType = MainContext;

    state = {
        petName: '',
        type: '',
        croppedImageUrl: 'https://placekitten.com/250/250',
        petProfilePictureFile: '',
        petProfileDescription: '',
        loading: true,
        disableSubmit: false,
        src: null,
        crop: {
            width: 250,
            aspect: 1 / 1
        }
    };

    onSelectFile = e => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener('load', () => 
            this.setState({
                src: reader.result })
            );
            reader.readAsDataURL(e.target.files[0])
        }
    };

    onImageLoaded = image => {
        this.imageRef = image;
    };

    onCropComplete = crop => {
        this.makeClientCrop(crop);
    };

    onCropChange = (crop) => {
        this.setState({ crop })
    };

    async makeClientCrop(crop) {
        if (this.imageRef && crop.width && crop.height) {
            const { url, blob } = await
            this.getCroppedImg(
                this.imageRef,
                crop,
                'newFile.jpeg'
            );
            this.setState({ croppedImageUrl: url, blob })
        }
    }

    getCroppedImg(image, crop, fileName) {
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );

        return new Promise((resolve) => {
            canvas.toBlob(blob => {
                if (!blob) {
                    console.error('Canvas is empty');
                    return;
                }
                blob.name = fileName;
                window.URL.revokeObjectURL(this.fileUrl);
                const url = window.URL.createObjectURL(blob);
                resolve({ url, blob });
            }, 'image/jpeg')
        });
    }

    hideCrop = e => {
        this.setState({
            petShown: false
        })
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        this.setState({
            disableSubmit: true
        })

        const petFiles = new FormData(e.target)

        const newPet = {
            userId: this.context.profile.id,
            petName: this.state.petName,
            type: this.state.type,
            petProfileDescription: this.state.petProfileDescription
        }

        let petInfo = await createPet(newPet);

        if (petFiles.get('petProfilePicture')) {
            const profilePicture = new FormData();

            profilePicture.append('petProfilePicture', this.state.blob)

            await uploadPetProfilePicture(petInfo.id, profilePicture);
        }

        this.props.history.push('/userdash');
    }

    // handlePictureChange = async (e) => {
    //         await this.setState({
    //             petProfilePictureFile: e.target.value,
    //             petProfilePictureURL: URL.createObjectURL(e.target.files[0])
    //         })
    // }

    render() {
        const { crop, croppedImageUrl, src } = this.state;

        return (
            <div className='create-pet-page'>

                <div className='cppnaplesyellow'> </div>

                <div className='cppbox'>

                    <form onSubmit={this.handleSubmit}>

                        <div>
                            <div className='upload-image-frame'>
                            <img
                                src={croppedImageUrl}
                                key={Date.now()}
                                alt=''
                                className="petprofilepicupload"
                            />
                            </div>

                            <input
                                type="file"
                                name="petProfilePicture"
                                accept='image/*'
                                className="petprofilepicsubmit"
                                onChange={this.onSelectFile}
                                // value={this.state.petProfilePictureFile}
                            />

                            <div>
                                {src && (
                                    <ReactCrop
                                        className='petpicpreview'
                                        src={src}
                                        crop={crop}
                                        ruleOfThirds
                                        onImageLoaded={this.onImageLoaded}
                                        onComplete={this.onCropComplete}
                                        onChange={this.onCropChange}
                                    />
                                )}
                                <br />
                                {/* {croppedImageUrl && (
                                    <img 
                                        alt='Crop'
                                        style={{ maxWidth: '100%' }}
                                        src={croppedImageUrl}
                                    />
                                )} */}
                            </div> 
                        </div>

                        <div className='petnamediv'>
                            <h5 className='petnameheader'>Pet Name</h5>
                            <input
                                name='petName'
                                maxLength='144'
                                className='petnameupload'
                                placeholder={this.state.petName}
                                onChange={(e) => this.setState({ petName: e.target.value })}
                                value={this.state.petName} />
                        </div>

                        <div className="typechoicediv">
                            <h5 className='typeheader'>Pet Type</h5>
                            <select
                                name='type'
                                className='typedropdown'
                                onChange={(e) => this.setState({ type: e.target.value })}>
                                <option value='cat'>Cat</option>
                                <option value='dog'>Dog</option>
                                <option value='reptile'>Reptile</option>
                                <option value='amphibian'>Amphibian</option>
                                <option value='fish'>Fish</option>
                                <option value='rodent'>Rodent</option>
                                <option value='other'>Other</option>
                            </select>
                        </div>

                        <div className='petdescdiv'>
                            <h5 className='petdescheader'>Pet Profile Description:</h5>
                            <textarea
                                rows="1"
                                name='petProfileDescription'
                                maxLength='750'
                                className='petdesc'
                                placeholder={this.state.petProfileDescription}
                                onChange={(e) => this.setState({ petProfileDescription: e.target.value })}
                                value={this.state.petProfileDescription} />
                        </div>

                        <br />

                        <button className='create-pet-button' disabled={this.state.disableSubmit}>Save Changes</button>
                        <br />
                    </form>
                </div>
            </div>
        )
    }
}
