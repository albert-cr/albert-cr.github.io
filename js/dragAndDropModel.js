function dropHandler(ev)  {
    ev.preventDefault();

    if (ev.dataTransfer.items) {
        // Use DataTransferItemList interface to access the file(s)
        for (var i = 0; i < ev.dataTransfer.items.length; i++) {
          // If dropped items aren't files, reject them
          if (ev.dataTransfer.items[i].kind === 'file') {
            var fileInput = ev.dataTransfer.items[i].getAsFile();
            console.log('... file[' + i + '].name = ' + fileInput.name);

            if (isValidFileType(fileInput)) {
                const reader = new FileReader();
        
                reader.onload = function(event) {
                    var contents = event.target.result;
                    document.getElementById("drop-area-message").innerHTML = "Loaded file: " + fileInput.name;    
                    drawCartera(JSON.parse(contents).Cartera)
                };
                
                reader.onerror = function(event) {
                    console.error("File could not be read! Code " + event.target.error.code);
                };
            
                reader.readAsText(fileInput);    
            } else {
                alert('Invalid file type'); 
                fileInput.value = ''; 
            }

          }
        }
      } else {
        // Use DataTransfer interface to access the file(s)
        for (var i = 0; i < ev.dataTransfer.files.length; i++) {
          console.log('... file[' + i + '].name = ' + ev.dataTransfer.files[i].name);
        }
      } 
}

function dragOverHandler(ev) {
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
  }  

function isValidFileType(fileInput) {
    var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.json)$/i; 
    return allowedExtensions.exec(fileInput.name);
}