var resp;

function copyClipToResp(writeToDb = false, timeout = 2000) {
    setTimeout(async function() {
        try {
            let res = await navigator.clipboard.readText();
            resp = JSON.parse(res);
            console.log("Copied Clipboard contents into 'resp'");
            if (writeToDb)
                copyToClip(resp, 0);
        } catch (e) {
            console.error("Failed to read from Clipboard", e);
        }
    }, timeout);
}

function copyToClip(resp, timeout = 2000) {
    setTimeout(async function() {
        try {
            var { title, uuid, subsectionsMap: menuClassifications, sectionEntitiesMap: menu } = resp.data;
            await navigator.clipboard.writeText(JSON.stringify({ title, uuid, menuClassifications, menu }));
            console.log("Successfully Copied appropriate data to clipboard")
        } catch (e) {
            console.error("Failed to copy data\n", e);
        }
    }, timeout);
}