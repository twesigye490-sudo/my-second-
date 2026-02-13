const upload = document.getElementById("upload");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let img = new Image();

upload.onchange = e => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
        };
        img.src = reader.result;
    };

    reader.readAsDataURL(file);
};

const brightness = document.getElementById("brightness");
const contrast = document.getElementById("contrast");

brightness.oninput = update;
contrast.oninput = update;

function update() {
    ctx.filter = `brightness(${brightness.value}%) contrast(${contrast.value}%)`;
    ctx.drawImage(img, 0, 0);
}

function download() {
    const link = document.createElement("a");
    link.download = "edited.png";
    link.href = canvas.toDataURL();
    link.click();
}
