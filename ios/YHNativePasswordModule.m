//
//  YHNativePasswordModule.m
//  PasswordAssistant
//
//  Created by young on 2017/6/4.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "YHNativePasswordModule.h"

@implementation YHNativePasswordModule
RCT_EXPORT_MODULE();

- (dispatch_queue_t)methodQueue {
  return dispatch_get_main_queue();
}

RCT_EXPORT_METHOD(changeGestureSwitchStatus:(NSString *)status) {
    [[NSUserDefaults standardUserDefaults] setValue:status forKey:@"gestureSwitchStatus"];
}

RCT_EXPORT_METHOD(changeGesturePassword:(NSString *)password) {
  [[NSUserDefaults standardUserDefaults] setValue:password forKey:@"gesturePassword"];
}

RCT_REMAP_METHOD(requireGestureSwitchStatus,
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
  
  NSString *status = [[NSUserDefaults standardUserDefaults] objectForKey:@"gestureSwitchStatus"];
  if (!status) {
    status = @"0";
  }
  resolve(status);
}

RCT_REMAP_METHOD(requireGesturePassword,
                 resolver1:(RCTPromiseResolveBlock)resolve1
                 rejecter1:(RCTPromiseRejectBlock)reject1) {
  
  NSString *password = [[NSUserDefaults standardUserDefaults] objectForKey:@"gesturePassword"];
  if (!password) {
    password = @"0";
  }
  
  resolve1(password);
}

RCT_REMAP_METHOD(requireGestureSwitchStatusAndPassword,
                 resolver2:(RCTPromiseResolveBlock)resolve2
                 rejecter2:(RCTPromiseRejectBlock)reject2) {
  
  NSString *password = [[NSUserDefaults standardUserDefaults] objectForKey:@"gesturePassword"];
  NSString *status = [[NSUserDefaults standardUserDefaults] objectForKey:@"gestureSwitchStatus"];
  if (!password) {
    password = @"0";
  }
  if (!status) {
    status = @"0";
  }
  resolve2(@{@"gestureSwitchStatus":status, @"gesturePassword":password});
}

@end
