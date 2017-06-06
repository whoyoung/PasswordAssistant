/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>

@interface AppDelegate()
@property (nonatomic,strong) UIView *maskView;
@property (nonatomic,strong) UIViewController *rootViewController;
@end

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation;

  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"PasswordAssistant"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  _rootViewController = [UIViewController new];
  _rootViewController.view = rootView;
  self.window.rootViewController = _rootViewController;
  [self.window makeKeyAndVisible];
  return YES;
}

- (void)applicationDidEnterBackground:(UIApplication *)application {
  self.maskView.hidden = NO;
}
- (void)applicationWillEnterForeground:(UIApplication *)application {
  self.maskView.hidden = YES;
  NSString *status = [[NSUserDefaults standardUserDefaults] objectForKey:@"gestureSwitchStatus"];
  if (status && [status isEqualToString:@"1"]) {
    NSString *password = [[NSUserDefaults standardUserDefaults] objectForKey:@"gesturePassword"];
    if (!password) {
      password = @"0";
    }
    [self sendAppEvent:@"applicationWillEnterForeground" body:@{@"password":password}];
  }
}
- (UIView *)maskView {
  if (!_maskView) {
    _maskView = [[UIView alloc] initWithFrame:CGRectMake(0, 0, [UIScreen mainScreen].bounds.size.width, [UIScreen mainScreen].bounds.size.height)];
    _maskView.backgroundColor = [UIColor lightGrayColor];
    _maskView.hidden = YES;
    [self.window addSubview:_maskView];
  }
  return _maskView;
}
- (void)sendAppEvent:(NSString *)name body:(NSDictionary *)data {
  RCTBridge *bridge = ((RCTRootView *)(self.rootViewController.view)).bridge;
  [bridge enqueueJSCall:@"RCTNativeAppEventEmitter"
                 method:@"emit"
                   args:data ? @[name, data] : @[name]
             completion:NULL];
  
}
@end
