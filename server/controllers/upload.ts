import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const upload = (request, response) => {
    const { image } = req.files
    if (req.files)

        let fileName = Date.now() + request.files.image.name; // + '.jpg'
        const __dirname = dirname(fileURLToPath(import.meta.url));
        (img or )request.files.image.mv(path.join(__dirname, '..', 'uploads', fileName))
        //             img.mv(path.resolve(__dirname, '..', 'static', fileNa

        const newArticleWithImage = new Article({ imageUrl: fileName}) // save image in article
    }
}