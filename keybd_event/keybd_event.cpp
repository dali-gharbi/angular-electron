
// keybd_event.cc
// #include <v8.h>
// #include <v8-debug.h>
// #include <node.h>
// #include <nan.h>
#include <windows.h>
namespace demo
{

using v8::Function;
using v8::FunctionCallbackInfo;
using v8::Isolate;
using v8::Local;
using v8::Null;
using v8::Object;
using v8::String;
using v8::Value;

void RunCallback(const FunctionCallbackInfo<Value> &args)
{
  Isolate *isolate = args.GetIsolate();
  Local<Function> cb = Local<Function>::Cast(args[0]);
  const unsigned argc = 1;
  Local<Value> argv[argc] = {String::NewFromUtf8(isolate, "pause/play")};
  keybd_event(VK_MEDIA_PLAY_PAUSE, 0x8f, 0, 0);               // PLAY/PAUSE Press
  keybd_event(VK_MEDIA_PLAY_PAUSE, 0x8f, KEYEVENTF_KEYUP, 0); // PLAY/PAUSE Release
  cb->Call(Null(isolate), argc, argv);
}

void Init(Local<Object> exports, Local<Object> module)
{
  NODE_SET_METHOD(module, "exports", RunCallback);
}

NODE_MODULE(NODE_GYP_MODULE_NAME, Init)

} // namespace demo