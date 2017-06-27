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
@property (nonatomic,strong) UIVisualEffectView *maskView;
@property (nonatomic,strong) UIViewController *rootViewController;
@end

@implementation AppDelegate
//程序启动时也要判断是否加锁
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSString *status = [[NSUserDefaults standardUserDefaults] objectForKey:@"gestureSwitchStatus"];
  NSDictionary *initialDict = nil;
  if (status && [status isEqualToString:@"1"]) {
    NSString *password = [[NSUserDefaults standardUserDefaults] objectForKey:@"gesturePassword"];
    if (password && ![password isEqualToString:@"0"]) {
      initialDict = @{@"password":password};
    }
  }
  NSURL *jsCodeLocation;
  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"PasswordAssistant"
                                               initialProperties:initialDict
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
    if (password && ![password isEqualToString:@"0"]) {
      [self sendAppEvent:@"applicationWillEnterForeground" body:@{@"password":password}];
    }
  }
}
- (UIView *)maskView {
  if (!_maskView) {
    UIBlurEffect *effect = [UIBlurEffect effectWithStyle:UIBlurEffectStyleLight];
    _maskView = [[UIVisualEffectView alloc] initWithEffect:effect];
    _maskView.frame = CGRectMake(0, 0, [UIScreen mainScreen].bounds.size.width, [UIScreen mainScreen].bounds.size.height);
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
