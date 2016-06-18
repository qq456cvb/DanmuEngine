var DEBitmapLoader = {
    BASE64_CHARS: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
    argb2rgba: function(data)
    {
        var batch = [];
        batch.length = 4;
        for (var i = 0; i < data.length; i += 4) {

            batch[0] = data[i];
            batch[1] = data[i + 1];
            batch[2] = data[i + 2];
            batch[3] = data[i + 3];

            var alpha = data[i];
            batch.shift();
            batch.push(alpha);

            data[i] = batch[0];
            data[i + 1] = batch[1];
            data[i + 2] = batch[2];
            data[i + 3] = batch[3];
        }
        return data;
    },

    readSize : function (data) {
        var bmd = Bitmap.createBitmapData(1, 1);
        var output = bmd.getPixels(bmd.rect);
        output.clear();
        var dataBuffer = [];
        dataBuffer.length = 4;
        var outputBuffer = [];
        outputBuffer.length = 3;
        var cnt = 0;
        var buffer = [];
        buffer.length = 8;
        for (var i = 0; i < data.length; i += 4) {
            for (var j = 0; j < 4 && i + j < data.length; j++) {
                dataBuffer[j] = this.BASE64_CHARS.indexOf(data.charAt(i + j));
            }

            outputBuffer[0] = (dataBuffer[0] << 2) + ((dataBuffer[1] & 0x30) >> 4);
            outputBuffer[1] = ((dataBuffer[1] & 0x0f) << 4) + ((dataBuffer[2] & 0x3c) >> 2);
            outputBuffer[2] = ((dataBuffer[2] & 0x03) << 6) + dataBuffer[3];
            for (var k = 0; k < outputBuffer.length; k++) {
                if (dataBuffer[k + 1] == 64) break;
                if (cnt >= 18 && cnt < 26) { // skip bmp header
                    buffer[cnt-18] = outputBuffer[k];
                }
                if (cnt >= 26) {
                    // assume little endian
                    var width = buffer[0] + (buffer[1] << 8 & 0xff00) + (buffer[2] << 16 & 0xff0000) + (buffer[3] << 24 & 0xff000000);
                    var height = buffer[4] + (buffer[5] << 8 & 0xff00) + (buffer[6] << 16 & 0xff0000) + (buffer[7] << 24 & 0xff000000);
                    // height is negative
                    height = -height;

                    return {
                        width  : width,
                        height : height
                    };
                }
                cnt++;
            }
        }
        return null;
    },
    extract: function (data) {
        var bmd = Bitmap.createBitmapData(1, 1);
        var output = bmd.getPixels(bmd.rect);
        output.clear();
        var dataBuffer = [];
        dataBuffer.length = 4;
        var outputBuffer = [];
        outputBuffer.length = 3;
        var cnt = 0;
        for (var i = 0; i < data.length; i += 4) {
            for (var j = 0; j < 4 && i + j < data.length; j++) {
                dataBuffer[j] = this.BASE64_CHARS.indexOf(data.charAt(i + j));
            }

            // attention, bgr to rgb convertion!
            outputBuffer[0] = (dataBuffer[0] << 2) + ((dataBuffer[1] & 0x30) >> 4);
            outputBuffer[1] = ((dataBuffer[1] & 0x0f) << 4) + ((dataBuffer[2] & 0x3c) >> 2);
            outputBuffer[2] = ((dataBuffer[2] & 0x03) << 6) + dataBuffer[3];
            for (var k = 0; k < outputBuffer.length; k++) {
                if (dataBuffer[k + 1] == 64) break;
                if (cnt >= 54) { // skip bmp header
                    //if (cnt % 3 == 1) {
                    //    output.writeByte(255); // add alpha channel
                    //};
                    output.writeByte(outputBuffer[k]);
                }
                cnt++;
            }
        }
        output = this.argb2rgba(output);
        output.position = 0;
        return output;
    },

    loadBitmapData: function (raw) {
        var size = this.readSize(raw);
        var bmd = Bitmap.createBitmapData(size.width, size.height);
        bmd.setPixels(bmd.rect, this.extract(raw));
        return bmd;
    },

    createBitmap: function (bitmapData, lifeTime, scale, parent) {
        var bmp = Bitmap.createBitmap({
            bitmapData: bitmapData,
            lifeTime: lifeTime,
            parent: parent,
            scale: scale
        });
        return bmp;
    }
};