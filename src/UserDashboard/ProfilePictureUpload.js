import ReactDOM from 'react-dom';
import React, { PureComponent } from 'react'
import { uploadProfilePicture } from '../fetches/user-fetches.js';
import ReactCrop from 'react-image-crop';
import { MainContext } from '../MainContext.js'
import 'react-image-crop/dist/ReactCrop.css';

export default class ProfilePictureUpload extends PureComponent {
    static contextType = MainContext;
    state = {
        profilePicture: '',
        imageShown: true,
        src: null,
        crop: {
            unit: '%',
            width: 150,
            aspect: 1 / 1
        }
    };

    onSelectFile = e => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener('load', () =>
                this.setState({
                    src: reader.result
                })
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
            const { url, blob } = await this.getCroppedImg(
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
            }, 'image/jpeg');
        });
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        const picture = new FormData();
        picture.append('profilePicture', this.state.blob)
        const existingUser = await uploadProfilePicture(picture);
        this.context.setProfile({ profile: existingUser })

        this.setState({
            imageShown: false
        })

    }

    render() {
        const { crop, croppedImageUrl, src } = this.state;

        return (
            <div>
                <div className="profilepicupload">
                    <form onSubmit={this.handleSubmit}>

                        <input
                            type="file"
                            name="profilePicture"
                            accept="image/*"
                            className="profilepicsubmit"
                            onChange={this.onSelectFile}
                        />
                        {this.state.imageShown === true
                            ?
                            <div>
                                {src && (
                                    <ReactCrop
                                        src={src}
                                        crop={crop}
                                        ruleOfThirds
                                        onImageLoaded={this.onImageLoaded}
                                        onComplete={this.onCropComplete}
                                        onChange={this.onCropChange}
                                    />
                                )}
                                <br />
                                {croppedImageUrl && (
                                    <img alt="Crop" style={{ maxWidth: '100%' }} src={croppedImageUrl} />
                                )}
                            </div>
                            : null}

                        <br />
                        <button className='profilesubbutton'>Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<ProfilePictureUpload />, document.getElementById('root'));