### Encryption and Decryption of files

The encryption and decryption are done using streams, thus we can encrypt any size of file. The cryptography is being done with initialization vector.

The CompleteSecure branch is working fine, where I am creating the IV using the password. In the master branch I am trying to append random 16 bytes to the file, but doing so doesn't allow me to pipe the writable stream twice (once with the encrypted string and then with the encrypted content of the file)

I have a question asked [here](https://stackoverflow.com/questions/46504589/piping-to-same-writable-stream-twice-via-different-readable-stream) on the same issue.
