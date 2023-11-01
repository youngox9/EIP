@echo off

echo Updating SVN...
call svn update

echo Running npm build...
call npm run build

echo sync...
call C:\Users\ianlo007\Documents\EIP-Front-end.ffs_batch

