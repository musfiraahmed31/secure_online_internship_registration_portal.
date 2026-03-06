<?php
function process_resume_upload($file_array) {
    if (!isset($file_array) || $file_array['error'] !== UPLOAD_ERR_OK) {
        die("Please upload a valid resume.");
    }

    $file_tmp = $file_array['tmp_name'];
    $file_size = $file_array['size'];
    $file_name = $file_array['name'];
    
    if ($file_size > 2097152) {
        die("File is too large. Maximum size is 2MB.");
    }

    $finfo = finfo_open(FILEINFO_MIME_TYPE);
    $mime = finfo_file($finfo, $file_tmp);
    finfo_close($finfo);

    if ($mime !== 'application/pdf') {
        die("Invalid file type. Only true PDF files are allowed.");
    }

    $upload_dir = 'uploads/';
    if (!is_dir($upload_dir)) {
        mkdir($upload_dir, 0755, true);
    }
    
    $htaccess_path = $upload_dir . '.htaccess';
    if (!file_exists($htaccess_path)) {
        file_put_contents($htaccess_path, "php_flag engine off\nOptions -ExecCGI");
    }

    $new_file_name = uniqid('resume_', true) . '.pdf';
    $destination = $upload_dir . $new_file_name;
    
    if (move_uploaded_file($file_tmp, $destination)) {
        return $destination; 
    } else {
        die("Failed to move uploaded file.");
    }
}
?>
